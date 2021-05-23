import {sizeFont, sizeHeight, sizeScale, sizeWidth} from './Responsive';
import {Colors, colorOpacityMaker} from './Colors';

export default {
  bold: {
    fontWeight: '500',
  },
  text: {
    color: Colors.textTepapa,
    fontSize: sizeFont(16),
  },
  textWhite: {
    color: Colors.white,
    fontSize: sizeFont(16),
  },
  button: {
    backgroundColor: Colors.cerulean,
    paddingHorizontal: sizeWidth(10),
    paddingVertical: sizeScale(5),
    borderRadius: sizeScale(30),
    margin: sizeHeight(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: sizeScale(90),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  flexRow: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  avatarCircle: {
    width: sizeWidth(60),
    height: sizeWidth(60),
    borderRadius: sizeWidth(40),
    resizeMode: 'cover',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayLoading: {
    backgroundColor: colorOpacityMaker(Colors.black, 60),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  titleText: {
    fontSize: sizeFont(12),
  },
  boxShadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  styleFontBoldText:{
    fontFamily : 'BalsamiqSans-Bold'
  },
  styleFontText:{
    fontFamily : 'BalsamiqSans-Regular'
  }
};
