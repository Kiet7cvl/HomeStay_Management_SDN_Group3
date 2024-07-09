import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { NavBarPage } from "./navBar";
// import img2 from "../../assets/images/bg_2.jpg";
import img1 from "../../assets/images/bg_1.jpg";
import { Carousel } from "react-bootstrap";
import { defaultA } from "../../common/constant";

/* Layout */


const Header = ( props ) =>
{
	const [ name, setName ] = useState( null );
	useEffect( () =>
	{
		if ( props.title )
		{
			setName( props.title );
		} else
		{
			setName( null )
		}
	}, [ props.title ] );
	return (
		<React.Fragment>
			<NavBarPage />
			{ name !== null &&
				<div className="hero-wrap" style={{backgroundImage: `url(${ defaultA })`, height: "200px",backgroundSize: "900px 200px"}} >

					<div className="overlay"></div>
					<div className="container">
						<div className="row no-gutters slider-text d-flex align-item-end justify-content-center">
							<div className="col-md-9 text-center d-flex align-items-end justify-content-center">
								<div className="text">
									<h1 className="mb-4 bread">{ name }</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			}

		</React.Fragment>
	);
};

export default Header;
