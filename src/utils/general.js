import { Platform } from 'react-native';
import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import PushNotification from 'react-native-push-notification';
import BadgeAndroid from 'react-native-android-badge';

import { Config } from "@/commons";

const COMPRESS_FORMAT = "JPEG";
const QUANLITY = 100;
const NEW_WIDTH = 400;
const NEW_HEIGHT = 400;

export const pickImage = (callBack) => {
	ImagePicker.showImagePicker(Config.imagePickerOpts, (response) => {
		if (response.didCancel) {
		} else if (response.error) {
		} else {
			callBack && callBack(response);
		}
	});
};

export const pickImageGallery = (callBack) => {
	ImagePicker.launchImageLibrary(Config.imagePickerOpts, (response) => {
		if (response.didCancel) {
		} else if (response.error) {
		} else {
			callBack && callBack(response.uri);
		}
	});
};

export const pickVideoOrImage = (mediaType, callBack, callbackAfterLaunch) => {
	ImagePicker.launchImageLibrary({...Config.imagePickerOpts, mediaType}, (response) => {
		if(callbackAfterLaunch) callbackAfterLaunch()
		if (response.didCancel) {
		} else if (response.error) {
		} else {
			callBack && callBack(response);
		}
	});
};

export const compressImage = async ({
	imageUri,
	quality = QUANLITY,
	width = NEW_WIDTH,
  height = NEW_HEIGHT,
  compressFormat = COMPRESS_FORMAT,
}) => {
	try {
		const response = await ImageResizer.createResizedImage(
			imageUri,
			width,
			height,
			compressFormat,
			quality
		);
		return response.uri;
	} catch (error) {
		console.log(error);
		return imageUri;
	}
};

export const isImageLinkUrl = (path = "") => path.startsWith("http");

export const documentPicker = async (
	callBack,
	isMultiple = false,
	fileType = null,
	cancelCb
) => {
	let type = fileType || DocumentPicker.types.allFiles;
	try {
		const results = isMultiple
			? await DocumentPicker.pickMultiple({ type })
			: await DocumentPicker.pick({ type });
		callBack && callBack(results);
	} catch (err) {
		if (DocumentPicker.isCancel(err)) {
			if(cancelCb) cancelCb()
		} else {
			throw err;
		}
	}
};

export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return "0B";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const setBadgeNumber = (val) => {
	if (Platform.OS === "android") {
		BadgeAndroid.setBadge(val)
	} else {
		PushNotification.setApplicationIconBadgeNumber(val)
	}
}

export const shuffleRandomArrayItems = (array) => {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }
