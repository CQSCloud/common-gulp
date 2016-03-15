'use strict';

/* eslint no-console:0, prefer-template:0, vars-on-top:0 */

var tracker = require('pivotaltracker');

var pivotalProjects = process.env.PIVOTAL_PROJECT.split(',');
var pivotalClient = new tracker.Client(process.env.PIVOTAL_TOKEN);

var getPivotalStories = function(gitStories) {
  var _deliverStory = function(projectId, storyId) {
    var story = pivotalClient.project(projectId).story(storyId);

    console.log('-- Updating pivotal story', storyId, 'comment');

    story.comments.create({ text: 'Deployed to staging, marked as delivered' }, function(err) {
      if (err) {
        console.error('ERROR: Pivotal comment', err);
        return;
      }

      console.log('-- Marking pivotal story', storyId, 'as delivered');

      story.update({ current_state: 'delivered' }, function(err2) {
        if (err2) {
          console.error('ERROR: Pivotal delivery', err2);
        }
      });
    });
  };

  console.log('Retrieving pivotal stories');

  pivotalProjects.forEach(function(projectId) {
    console.log('Retrieving stories for project', projectId);

    pivotalClient
      .project(projectId)
      .stories.all({ with_state: 'finished' }, function(err, stories) {
        if (err) {
          console.error('ERROR: Pivotal query', err);
          return;
        }

        console.log('Found', stories.length, 'finished pivotal stories');

        stories.forEach(function(story) {
          var gitStory = gitStories['' + story.id];

          console.log('--', story.id, story.currentState, story.name);

          if (gitStory) {
            _deliverStory(projectId, story.id);
          }
        });
      });
  });
};

var getGitStories = function(commits) {
  var regex = /\[(Finishes|Fixes|Fin|Fix)\s+[#]{1,3}(\d+)\]/gi;
  var stories = {};

  console.log('Evaluating', commits.length, 'git commits');

  commits.forEach(function(commit) {
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

  Object.keys(stories).forEach(function(storyId) {
    var story = stories[storyId];

    console.log('--', storyId, story.msg);
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
