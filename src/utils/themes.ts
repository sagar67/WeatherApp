export type Theme = {
  backgroundColor: string;
  textColor: string;
  inputBackgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  placeholderColor: string; 
  activityIndicatorColor: string;
  errorColor: string;
};

export const lightTheme: Theme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  inputBackgroundColor: '#F0F0F0',
  buttonColor: '#007AFF',
  buttonTextColor: '#FFFFFF',
  placeholderColor: '#999999',  
  activityIndicatorColor: '#007AFF', 
  errorColor: '#FF3B30',
};

export const darkTheme: Theme = {
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  inputBackgroundColor: '#1C1C1E',
  buttonColor: '#0A84FF',
  buttonTextColor: '#FFFFFF',
  placeholderColor: '#666666', 
  activityIndicatorColor: '#0A84FF', 
  errorColor: '#FF453A',
};