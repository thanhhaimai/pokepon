$(function() {
  SC.initialize({
    client_id: 'df1eacadddaf233fdf1c1192a27b7ce5'
  });

  SC.stream('/tracks/293', function(sound) {
    console.log(sound);
    sound.play();
  });
});
