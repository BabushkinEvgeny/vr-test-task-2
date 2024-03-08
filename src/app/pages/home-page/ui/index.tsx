import React from "react";
import { CatFactComponent } from "../../../features/cat-fact/ui";
import { AgeFormComponent } from "../../../features/user-age/ui";

const MainPage = () => {
  return (
    <div>
      <CatFactComponent />
      <AgeFormComponent />
    </div>
  );
};

export default MainPage;
