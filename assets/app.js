$(document).ready(function() {

  var twitchStreamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin", "comster404"];


  for (var i = 0; i < twitchStreamers.length; i++) {
    twitchStreamersStatus(twitchStreamers[i]);
  }

  $('#r1').click(function() {
    $('.closed').show();
    $('.offline').show();
    $('.online').show();
  });

  $("#r2").click(function() {
    $('.closed').hide();
    $('.offline').hide();
    $('.online').show();
   });

  $("#r3").click(function() {
    $('.closed').hide();
    $('.offline').show();
    $('.online').hide();
  });
});

function twitchStreamersStatus(username) {

 $.getJSON('https://api.twitch.tv/kraken/streams/' + username + '?callback?', function(data) {
    if (data.stream) {
      $('.account-list').append(
        '<li class="status online"><div><a href="' + data.stream.channel.url +
        '" target="_blank"><img class="account-avatar" src="' + data.stream.channel.logo +
        '" alt="?"></a></div><div class="account-details"><a href="' + data.stream.channel.url +
        '" target="_blank"><p class="account-name">' + data.stream.channel.display_name +
        '</p></a><p class="account-status">' + data.stream.channel.status +
        '</p></li>');
    }
      $.getJSON(data._links.channel, function(channel) {
        if(channel.logo === null) {
          channel.logo = 'http://placehold.it/100?text=N.N.';
        }
        $('.account-list').append(
          '<li class="status offline"><div><a href="' + channel.url +
          '" target="_blank"><img class="account-avatar" src="' + channel.logo +
          '" alt="Avatar"></a></div><div class="account-details"><a href="' + channel.url +
          '" target="_blank"><p class="account-name">' + channel.display_name +
          '</p></a><p class="account-status"><em>Offline</em></p></li>');
      });
  }).fail(function() {
    $('.account-list').append(
      '<li class="status closed"><div><img class="account-avatar" src="http://placehold.it/100?text=N.N." alt="Avatar"></div><div class="media-body"><p class="account-name">' + username +
      '</p></a><p class="account-status"><em>Account closed</em></p></li>');
  });
}
