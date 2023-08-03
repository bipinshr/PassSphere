import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <>
      <li className="cards_item">
        <Link className="cards_item_link" to={props.path}>
          <figure className="cards_item_wrap" data-category={props.label}>
            <img src={props.src} alt="Features_Image" className="cards_item_img" />
          </figure>
          <div className="cards_item_info">
            <h5 className="cards_item_text">{props.text}</h5>
          </div>
          <div className="cards_item_paragraph">
            <span className="cards_item_paragraph_text">{props.info}</span>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
