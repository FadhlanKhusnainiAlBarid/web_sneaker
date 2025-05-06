import { Button } from "flowbite-react";
import React from "react";

function RowSneakers() {
  return (
    <tr className="*:text-lg *:pl-2 md:*:pl-4 *:py-2.5 border-y-2 border-gray-400">
      <td>1</td>
      <td className="w-32">Lorem ipsum dolor sit</td>
      <td className="w-32">
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
      <td>
        The Air Max Waffle merges two of Nike's most revolutionary sneakers to
        create an audacious new design, rooted in heritage. It takes the
        signature midsole and Tuned Air experience from the Air Max Plus and
        pairs it with the lightweight upper and Waffle outsole from the famed
        Waffle Trainer of the '70s running-boom era—a time when Nike's foothold
        was gaining ground with every step. This edition pairs a black and Hyper
        Blue upper with flashy Metallic Gold accents for an eye-catching finish.
      </td>
      <td className="w-24">200000</td>
    </tr>
  );
}

export default RowSneakers;
