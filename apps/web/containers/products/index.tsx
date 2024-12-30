import React from "react";
import { TableDemo } from "../dashboardTablecomponent";

const Products = () => {
  let items = [
    {
      product: {
        type: "product",
        name: "SLAY Signature Blend Arabica Coffee Powder",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731324364%2FSLAY%2520Signature%2520100%2520Arabica%2520Coffee%2520Beans1.webp&w=384&q=75",
        variants: ["XYZ"],
      },
      status: "Active",
      vendor: "SlayStore",
    },
    {
      product: {
        type: "product",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731323316%2FSLAY%2520X%2520100%2520Premium%2520Robusta%2520Coffee%2520Beans1.webp&w=384&q=75",
        name: "SLAY X-Blend Arabica Coffee Powder",
        variants: ["XYZ"],
      },

      status: "Draft",
      vendor: "DotPeStore",
    },
    {
      product: {
        type: "product",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731324925%2FSLAY%2520Madras%2520Mud%2520Coffee%2520Grounds%2520%2528Powder%25291.webp&w=384&q=75",
        name: "SLAY Madras Mud Blend Arabica Coffee Powder",
        variants: ["XYZ"],
      },

      status: "Archived",
      vendor: "SlayStore",
    },
    {
      product: {
        type: "product",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731321614%2FSLAY%2520Combo%2520Pack%2520%2528250g%2520each%25291.webp&w=384&q=75",
        name: "SLAY (Combo Pack) Arabica Coffee Powder",
        variants: ["XYZ"],
      },

      status: "Active",
      vendor: "DotPeStore",
    },
    {
      product: {
        type: "product",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731318903%2FBlueberry%2520Lemonade%2520and%2520Mint%2520Kombucha1.webp&w=384&q=75",
        name: "SLAY Blueberry Lemonade Kombucha",
        variants: ["XYZ"],
      },

      status: "Draft",
      vendor: "DotPeStore",
    },
    {
      product: {
        type: "product",
        image:
          "https://slaycofee.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdiowg4rud%2Fimage%2Fupload%2Fv1731320554%2FHazelnut%2520Coffee%2520Protein%2520Bar%2520with%252025%2520protein1.webp&w=384&q=75",
        name: `Hazelnut Coffee Protein Bar with "25% protein"`,
        variants: ["XYZ", "abc", "ryt"],
      },

      status: "Active",
      vendor: "SlayStore",
    },
  ];
  return <TableDemo data={items}></TableDemo>;
};

export default Products;
