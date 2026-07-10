import { Alert } from 'react-native';

type AlertAction = {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
};

type OpenAlertOptions = {
  title: string;
  message?: string;
  cancelable?: boolean;
  actions?: AlertAction[];
};

const openNativeAlert = ({
  title,
  message,
  cancelable = false,
  actions,
}: OpenAlertOptions) => {
  Alert.alert(
    title,
    message,
    actions?.length
      ? actions
      : [
          {
            text: 'OK',
          },
        ],
    {
      cancelable,
    },
  );
};

export default openNativeAlert;

//  ------ USAGE EXAMPLE
// openNativeAlert({
//   title: 'Delete Recipient',
//   message: 'This action cannot be undone.',
//   actions: [
//     {
//       text: 'Cancel',
//       style: 'cancel',
//     },
//     {
//       text: 'Delete',
//       style: 'destructive',
//       onPress: deleteRecipient,
//     },
//   ],
// });