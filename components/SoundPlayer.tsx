import { Audio } from 'expo-av';

const playSound = async (soundName: string) => {
  let soundPath;
  if (soundName === 'Katze') {
    soundPath = require('../assets/sounds/cat.mp3'); // Adjust path to your assets
  } else if (soundName === 'Hund') {
    soundPath = require('../assets/sounds/dog.mp3'); // Adjust path to your assets
  } else {
    console.error('Unknown sound name:', soundName);
    return;
  }

  try {
    const { sound } = await Audio.Sound.createAsync(soundPath);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync(); // Clean up sound instance after playing
      }
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export default playSound;