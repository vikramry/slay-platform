import React from "react";

import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";
function BreadcrumbComp({
  breadcrumb,
}: {
  breadcrumb: { name: string; url?: string; active: boolean }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index: number) => {
          return (
            <>
              <BreadcrumbItem>
                {item.active ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item?.url}>{item?.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index != breadcrumb?.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComp;
