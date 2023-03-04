import React from "react";
import { UilEye } from "@iconscout/react-unicons";
import storyImage from "@/assets/images/pexels-keira-burton-6624179.jpg";
const AdminStory = () => {
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold">
              Lorem Ipsum Dolor 1
            </h2>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <p>Author:</p> <p>Ikenna</p>
              </div>
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <p>Location:</p>
                <p>Lagos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UilEye className="h-5 w-5 text-slate-400" />
            <p className="text-slate-400 text-xs">232</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
            odit voluptates consequuntur. Quibusdam, maiores. Nemo consequuntur
            repellat delectus. Veritatis fugiat quos tempora esse ex laudantium
            dolore id libero voluptatum harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eius
            assumenda nobis fuga ratione ducimus praesentium a natus et, quam
            commodi ipsa tenetur impedit dolorem maxime non eaque necessitatibus
            qui!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            commodi neque fugiat quibusdam enim, voluptatibus aperiam
            consectetur beatae deleniti velit fugit. Temporibus atque voluptas
            a? Animi iusto ea dicta deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            commodi neque fugiat quibusdam enim, voluptatibus aperiam
            consectetur beatae deleniti velit fugit. Temporibus atque voluptas
            a? Animi iusto ea dicta deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            commodi neque fugiat quibusdam enim, voluptatibus aperiam
            consectetur beatae deleniti velit fugit. Temporibus atque voluptas
            a? Animi iusto ea dicta deserunt!
          </p>
          <img
            src={storyImage}
            alt="Photo by Keira Burton"
            className="max-h-[450px] w-full object-cover object-center rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStory;
