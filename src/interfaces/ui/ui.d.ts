// Interfaces
import { IUser, INotification } from "..";

interface IModal {
  open: boolean;
  title: string;
  type: string;
  section: string | null;
  info: IUser | IClient | null;
}

interface UI {
  notifications: INotification[];
  request: {
    loading: boolean;
    message: string;
  };
  openSidebar: boolean;
  isMobile: boolean;
  modal: IModal;
}
