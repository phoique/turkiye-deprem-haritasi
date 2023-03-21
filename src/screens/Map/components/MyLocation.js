import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '../../../components';
import useStyles from '../useStyles';
import {useMyLocation} from '../hooks';

const MyLocation = ({changeRegion}) => {
  const styles = useStyles();
  const {getMyLocation, location} = useMyLocation();
  const [myLocationStatus, setMyLocationStatus] = React.useState(true);

  // Eğer kullanıcı kendi koordinatına gitmek istiyor ise ve location var ise
  React.useEffect(() => {
    if (myLocationStatus && location.latitude) {
      setMyLocationStatus(false);
      changeRegion(location);
    }
  }, [changeRegion, location, myLocationStatus]);

  const handlePress = React.useCallback(() => {
    setMyLocationStatus(true);
    getMyLocation();
  }, [getMyLocation]);
  return (
    <TouchableOpacity style={styles.myLocationContainer} onPress={handlePress}>
      <Icon name="navigation" size={30} />
    </TouchableOpacity>
  );
};

export default MyLocation;
