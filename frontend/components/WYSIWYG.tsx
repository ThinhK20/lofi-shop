import { Button } from "flowbite-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

type Props = {
   classname?: string;
   height?: string;
   width?: string;
};

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
   ssr: false,
   loading: () => <p>Loading ...</p>,
});

const modules = {
   toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
         { list: "ordered" },
         { list: "bullet" },
         { indent: "-1" },
         { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
   ],
   clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
   },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
   "header",
   "font",
   "size",
   "bold",
   "italic",
   "underline",
   "strike",
   "blockquote",
   "list",
   "bullet",
   "indent",
   "link",
   "image",
   "video",
];

const WYSIWYG = (props: Props) => {
   const handleChange = (value: string) => {
      console.log("Value: ", value);
   };

   return (
      <>
         <div
            className={`${props.classname} relative`}
            style={{ height: `calc(${props.height} + 100px)` }}
         >
            <QuillNoSSRWrapper
               modules={modules}
               style={{ height: props.height }}
               formats={formats}
               theme="snow"
               onChange={handleChange}
            />
            <div className="flex items-center gap-6 absolute right-20 bottom-0">
               <Button className="w-28">Gửi</Button>
               <Button color={"light"}>Hủy</Button>
            </div>
         </div>
      </>
   );
};

export default WYSIWYG;
