import { Status } from "@/hooks/useShowToast";

type ToastController = {
  showToast: (status: Status, message: string) => void;
};

class ToastService {
  private static instance: ToastService;
  private controller: ToastController | null = null;

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  public setController(ref: ToastController) {
    this.controller = ref;
  }

  public showToast(status: Status, message: string) {
    if (!this.controller) {
      console.warn("Toast controller not set.");
      return;
    }
    this.controller.showToast(status, message);
  }
}

export const toastService = ToastService.getInstance();
