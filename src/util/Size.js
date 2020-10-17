import React from 'react';
import { Dimensions } from 'react-native';
import CommonStyles from './CommonStyle'
const { width, height } = Dimensions.get('window');

const percentHeight = height / 100;
const percentWidth = width / 100;

export const sizeWidth = (percent) => {
  return percent * (percentWidth < percentHeight ? percentWidth : percentHeight);
};

export const sizeHeight = (percent) => {
  return percent * (percentWidth > percentHeight ? percentWidth : percentHeight);
};

export const sizeFont = (percent) => {
  return percent * (percentWidth < percentHeight ? percentWidth : percentHeight);
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const current_state = (status) => {
  switch(parseInt(status)){
      case 0 : return 'REJECTED' 
      case 1 : return 'PLACED' 
      case 2 : return  'A.APPROVED'
      case 3 : return  'M.APPROVED'
      case 4 : return  'S.APPROVED'
      case 5 : return  'DELIVERED'
    }
}

export const state_color = (status) => {
  switch(parseInt(status)){
      case 0 : return CommonStyles.bb00  
      case 1 : return CommonStyles.bb01 
      case 2 : return CommonStyles.bb02  
      case 3 : return CommonStyles.bb03  
      case 4 : return CommonStyles.bb04  
      case 5 : return CommonStyles.bb05  
    }
}