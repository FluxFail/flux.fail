import React from 'react';
import BusIcon from 'material-ui/svg-icons/maps/directions-bus';
import FerryIcon from 'material-ui/svg-icons/maps/directions-boat';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import SubwayIcon from 'material-ui/svg-icons/maps/subway';
import TrainIcon from 'material-ui/svg-icons/maps/train';
import TramIcon from 'material-ui/svg-icons/maps/tram';
import FallbackIcon from 'material-ui/svg-icons/maps/directions-transit';

const TransportIcon = ({ type, padding = 7 }) => {
  let iconStyle = null;
  if (padding) {
    iconStyle = {
      paddingRight: padding,
    };
  } else {
    iconStyle = {
      padding: 0,
    };
  }
  switch (type) {
    case 'bus':
      return <BusIcon style={iconStyle} />
    case 'ferry':
      return <FerryIcon style={iconStyle} />
    case 'flight':
      return <FlightIcon style={iconStyle} />
    case 'subway':
      return <SubwayIcon style={iconStyle} />
    case 'train':
      return <TrainIcon style={iconStyle} />
    case 'tram':
      return <TramIcon style={iconStyle} />
    default:
      return <FallbackIcon style={iconStyle} />
  }
};

export default TransportIcon;
