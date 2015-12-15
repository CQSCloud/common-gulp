'use strict';

/* eslint no-console:0, prefer-template:0, vars-on-top:0 */

var tracker = require('pivotaltracker');
var _ = require('lodash');

var getPivotalStories = function(gitStories) {
  var client = new tracker.Client(process.env.PIVOTAL_TOKEN);

  var _deliverStory = function(id) {
    var story = client.project(process.env.PIVOTAL_PROJECT).story(id);

    console.log('-- Updating pivotal story', id, 'comment');
    story.comments.create({
      text: 'Deployed to staging, marked as delivered'
    }, function(err) {
      if (err) {
        console.error('ERROR: Pivotal comment', err);
        return;
      }

      console.log('-- Marking pivotal story', id, 'as delivered');
      story.update({
        current_state: 'delivered'
      }, function(err2) {
        if (err2) {
          console.error('ERROR: Pivotal delivery', err2);
        }
      });
    });
  };

  console.log('Retrieving finished pivotal stories');

  client
    .project(process.env.PIVOTAL_PROJECT)
    .stories.all({
      with_state: 'finished'
    }, function(err, stories) {
      if (err) {
        console.error('ERROR: Pivotal query', err);
        return;
      }

      console.log('Found', stories.length, 'finished pivotal stories');
      _.forEach(stories, function(story) {
        console.log('--', story.id, story.currentState, story.name);
      });

      _.forEach(stories, function(story) {
        var gitStory = gitStories['' + story.id];
        if (gitStory) {
          console.log('Found pivotal story', story, 'matching git commit', gitStory);
          _deliverStory(story.id);
        }
      });
    });
};

var getGitStories = function(commits) {
  var regex = /\[(Finishes|Fixes|Fin|Fix)\s+[#]{1,3}(\d+)\]/gi;
  var stories = {};

  console.log('Evaluating', commits.length, 'git commits');

  _.forEach(commits, function(commit) {
    var match = regex.exec(commit);

    while (match) {
      stories[match[2]] = {
        id: match[2],
        msg: commit
      };
      match = regex.exec(commit);
    }
  });

  console.log('Found', Object.keys(stories).length, 'finishes/fixes git commits');
  _.forEach(stories, function(story) {
    console.log('--', story.id, story.msg);
  });

  getPivotalStories(stories);
};

process.stdin.resume();
process.stdin.setEncoding('utf8');

var data = '';
process.stdin.on('data', function(chunk) {
  data = data + chunk;
});

process.stdin.on('end', function() {
  getGitStories(data.split('\n'));
});
