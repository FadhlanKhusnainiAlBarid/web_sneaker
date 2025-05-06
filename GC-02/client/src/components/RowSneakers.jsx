import React from "react";
import { Checkbox } from "flowbite-react";

function RowSneakers() {
  return (
    <tr className="odd:bg-white even:bg-gray-100 *:text-2xl *:font-medium *:p-2 md:*:px-4 border-y-2 border-gray-400">
      <td>
        <Checkbox className="p-4" />
      </td>
      <td>1</td>
      <td className="group">
        <span className="group-hover:line-clamp-none line-clamp-1">
          Lorem ipsum dolor sit
        </span>
      </td>
      <td className="w-24 hover:w-60">
        <a
          href="https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg"
          target="_blank"
        >
          <img
            className="w-full"
            src="https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg"
            alt="Neme"
          />
        </a>
      </td>
      <td className="group">
        <span className="group-hover:line-clamp-none line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem aspernatur cupiditate natus velit corporis? Quod
          possimus distinctio, magnam ducimus provident consectetur nobis. Quae
          cupiditate tenetur reprehenderit maxime eum, sit veritatis.
        </span>
      </td>
      <td>200000</td>
    </tr>
  );
}

export default RowSneakers;
