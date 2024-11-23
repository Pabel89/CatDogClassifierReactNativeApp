/**
 * @author Alexander Pabel &lt;pabelito89@gmail.com>
 * @description Simple React Native App als Client um Bilder darauf zu ueberpruefen, ob ein Hund
 * oder eine Katze gezeigt wurde. Diese App interagiert mit dem "CatDogImageClassifierServer"
 * aus einem anderen Repo von mir.
 */
import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MyImagePicker from '@/components/ImagePicker';
import playSound from '@/components/SoundPlayer';
import CONFIG from '../config/conf';

interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

export default function Index() {
	  const [imageData, setImageData] = useState<ImageFile | null>(null);
	  const [isUploading, setIsUploading] = useState(false);
	  const [result, setResult] = useState<String| null>(null);
	  
	  
	  //innere Funktion um den Base64 String vom ImagePicker in ein Blob zu konvertieren
	  const base64ToBlob = (base64: string, contentType: string = 'image/jpeg') => {
		  const byteCharacters = atob(base64);
		  const byteArrays = [];

		  for (let i = 0; i < byteCharacters.length; i += 512) {
			const slice = byteCharacters.slice(i, i + 512);
			const byteNumbers = new Array(slice.length);
			for (let j = 0; j < slice.length; j++) {
			  byteNumbers[j] = slice.charCodeAt(j);
			}
			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		  }

		  return new Blob(byteArrays, { type: contentType });
	   };

	  //Refreshe mit dem ausgewählten Bild aus dem ImagePicker diese Elternkomponente Index.tsx 
	  const refreshImagepath = (path: string) => {
	  
		const imageFile: ImageFile = {
		  uri: path,
		  name: 'image.jpg',
		  type: 'image/jpeg',
		};

		setImageData(imageFile);
	  };

	  //Sende ein Bild was ausgewaehlt wurde zum Server
	  const sendPic = async () => {
		if (!imageData) {
		  console.error("Kein Bild ausgewäehlt");
		  alert("Erst Bild auswaehlen vor dem Versand");
		  return;
		}

		setIsUploading(true); // Zeige Ladestatus an
		
		 const base64Data = imageData.uri.replace(/^data:image\/\w+;base64,/, '');
		// Konvertiere Base64 zu Blob
		const blob = base64ToBlob(base64Data, imageData.type);
		
		const formData = new FormData();
		formData.append('file', blob, imageData.name);

		try {
		  const response = await fetch(CONFIG.API_URL, {
			method: 'POST',
			body: formData,
		  });

		  if (!response.ok) {
			throw new Error(`Server responded with status ${response.status}`);
		  }

		  const data = await response.json();
		  switch(data.message) {
			  case "cats":
				 setResult("Katze");
				 playSound("Katze");
				break;
			  case "dogs":
				 setResult("Hund");
				 playSound("Hund");
				break;
			  default:
				 setResult(null);
		  }
		
		  console.log(data);
		  alert('Bild upload erfolgreich!');
		} catch (error) {
		  console.error('Upload error:', error);
		  alert('Ein Fehler ist passiert. Bitte nochmal versuchen');
		} finally {
		  setIsUploading(false); // Reset loading state
		}
	  };

	  return (
		<View style={styles.container}>
		  <Text style={styles.text}>
			{imageData ? "Bild ausgewählt" : "Noch kein Bild ausgewählt"}
		  </Text>
		  <MyImagePicker uploadimage={refreshImagepath} />
		  <Text style={styles.text}>Dieses Bild zeigt: {result}</Text>
		  {imageData && (
			<Button
			  title={isUploading ? "Uploading..." : "Bild prüfen"}
			  onPress={sendPic}
			  disabled={isUploading}
			/>
		  )}
		  {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
		</View>
	  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	backgroundColor:'#dff2f2',
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
  },
  button: {
	justifyContent: 'center',
    alignItems: 'center',
  },
});