import swal from "sweetalert";
export const Alert = ({ title, text, icon, button, timer }) =>
  swal({
    title: title ? title : "-",
    text: text ? text : "-",
    icon: icon ? icon : "success",
    button: button ? button : false,
    timer: timer ? timer : 2000,
  });
