import React from "react";
import { Location, useLocation } from "react-router";
import { RouteSteps } from "../shared/stepsHelper";
import { Link } from "react-router-dom";

export const Header = () => {
  const location: Location<string> = useLocation();

  const pathMatchRoute = (route: RouteSteps): boolean => {
    return route === location.pathname;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <Link to={RouteSteps.home}>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-5 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm fond-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute(RouteSteps.home) && "text-black border-b-red-500"
              }`}
            >
              <Link to={RouteSteps.home}>Home</Link>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm fond-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute(RouteSteps.offers) &&
                "text-black border-b-red-500"
              }`}
            >
              <Link to={RouteSteps.offers}>Offers</Link>
            </li>
            <li
              className={`cursor-pointer py-3 text-sm fond-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute(RouteSteps.signIn) &&
                "text-black border-b-red-500"
              }`}
            >
              <Link to={RouteSteps.signIn}>Sign in</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
