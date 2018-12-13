import React from 'react';
import BusIcon from 'material-ui/svg-icons/maps/directions-bus';
import TrainIcon from 'material-ui/svg-icons/maps/train';
import SubwayIcon from 'material-ui/svg-icons/maps/subway';
import TramIcon from 'material-ui/svg-icons/maps/tram';
import FerryIcon from 'material-ui/svg-icons/maps/directions-boat';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import FallbackIcon from 'material-ui/svg-icons/maps/directions-transit';
import LiftIcon from './icons/lift';
import RocketIcon from './icons/rocket';

export const VehicleMap = {
  0: 'None',
  1: 'Bus',
  2: 'Train',
  4: 'Subway',
  8: 'Tram',
  16: 'Lift',
  32: 'Ship',
  64: 'Airplane',
  128: 'Rocket',
};

export const VehicleIcon = ({
  id, size, className = '', style = {},
}) => {
  switch (id) {
    case 1:
      return <BusIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 2:
      return <TrainIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 4:
      return <SubwayIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 8:
      return <TramIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 16:
      return <LiftIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 32:
      return <FerryIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 64:
      return <FlightIcon className={className} style={{ ...style, width: size, height: size }} />;
    case 128:
      return <RocketIcon className={className} style={{ ...style, width: size, height: size }} />;
    default:
      return <FallbackIcon className={className} style={{ ...style, width: size, height: size }} />;
  }
};
