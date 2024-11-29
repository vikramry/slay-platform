import React from "react";

import { Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@repo/ui";
function BreadcrumbComp({breadcrumb}: {breadcrumb:any[]}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item:any,index:number) => {
          return (
            <div>
              <BreadcrumbItem>
                <BreadcrumbLink href={item?.url}>{item?.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComp;
