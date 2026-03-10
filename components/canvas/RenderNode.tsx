import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { SectionNode } from "../base/SectionNode";
import { ContainerNode } from "../base/ContainerNode";
import { CardNode } from "../base/CardNode";
import { TextNode } from "../base/TextNode";
import { ImageNode } from "../base/ImageNode";
import { ButtonNode } from "../base/ButtonNode";
import { LinkNode } from "../base/LinkNode";
import { InputNode } from "../base/InputNode";
import { TextareaNode } from "../base/TextareaNode";
import { MetaNode } from "../base/MetaNode";

export const RenderNode: React.FC<RenderNodeProps> = (props) => {
  const { node } = props;

  switch (node.type) {
    case "section":
      return <SectionNode {...props} />;
    case "container":
      return <ContainerNode {...props} />;
    case "card":
      return <CardNode {...props} />;
    case "text":
      return <TextNode {...props} />;
    case "image":
      return <ImageNode {...props} />;
    case "button":
      return <ButtonNode {...props} />;
    case "link":
      return <LinkNode {...props} />;
    case "input":
      return <InputNode {...props} />;
    case "textarea":
      return <TextareaNode {...props} />;
    case "meta":
      return <MetaNode {...props} />;
    default:
      return null;
  }
};