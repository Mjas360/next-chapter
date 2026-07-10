import { t } from 'i18next';
import {
    BookBookmarkIcon,
    BookOpenIcon,
    ChatDotsIcon,
    GearIcon,
    HeadsetIcon,
    HeartIcon,
    NoteIcon,
    SignOutIcon,
    TrashIcon,
    UserIcon,
} from 'phosphor-react-native';
import { MD3Colors } from 'react-native-paper';
import { openHelpCenter, openTerms } from '~/utils/externalLinkActions';

export const accountMenuList = [
  {
    title: t('My Profile'),
    icon: UserIcon,
    onPress: () => console.log('TODO: Implement profile functionality'),
  },
  {
    title: t('My Orders'),
    icon: BookBookmarkIcon,
    onPress: () => console.log('TODO: Implement orders functionality'),
  },
  {
    title: t('Reading List'),
    icon: BookOpenIcon,
    onPress: () => console.log('TODO: Implement reading list functionality'),
  },
  {
    title: t('Favorites'),
    icon: HeartIcon,
    onPress: () => console.log('TODO: Implement favorites functionality'),
  },
  {
    title: t('Settings'),
    icon: GearIcon,
    onPress: () => console.log('TODO: implement settings functionality'),
  },
];

export const otherMenuList = [
  {
    title: t('Help & Support'),
    icon: HeadsetIcon,
    onPress: () => openHelpCenter(),
  },
  {
    title: t('Terms & Conditions'),
    icon: NoteIcon,
    onPress: () => openTerms(),
  },
  {
    title: t('Send Feedback'),
    icon: ChatDotsIcon,
    onPress: () => console.log('TODO: Implement feedback functionality'),
  },
  {
    title: t('Delete Account'),
    icon: TrashIcon,
    onPress: () => console.log('TODO: Implement delete account functionality'),
  },
  {
    title: t('Logout'),
    icon: SignOutIcon,
    onPress: () => console.log('TODO: Implement logout functionality'),
    color: MD3Colors.error40,
  },
];
