import React from "react";
// import Routes from "./Routes/index";

//import Custom Style scss
// import "./assets/scss/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./layouts/routerRender";
// import Loading from "./components/common/loading";
// import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <React.Fragment>
		{/* <Loading/> */}
      	<Layout/>
		<ToastContainer/>
    </React.Fragment>
  );
}

export default App;
