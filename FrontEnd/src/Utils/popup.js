import { createRoot } from "react-dom/client";
import popup from "sweetalert2";
import { POPUP_CONFIRM } from "../config/popup";

export const confirm_popup = async (e, callback) => {
  popup.fire(POPUP_CONFIRM).then(async result => {
    if (result.isConfirmed) {
      callback(e);
    }
  });
};

export const custom_confirm_popup = async (e, fields, callback) => {
  const popupOptions = {
    ...POPUP_CONFIRM,
    ...fields,
  };
  popup.fire(popupOptions).then(async result => {
    if (result.isConfirmed) {
      callback(e);
    }
  });
};

export const data_popup = (title, data) => {
  popup.fire({
    title: title,
    showCloseButton: true,
    showConfirmButton: false,
    html: '<div id="popup-content"></div>', // Placeholder for React component
    didOpen: () => {
      const container = document.getElementById("popup-content");
      if (container) {
        const root = createRoot(container); // Create a root for React
        root.render(data); // Render the React component
      }
    },
    customClass: {
      container: "n_class1",
      popup: "n_class2",
      header: "n_class3",
      htmlContainer: "text-start",
      loader: "n_class5",
    },
  });
};
