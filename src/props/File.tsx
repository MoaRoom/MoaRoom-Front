import React from "react";

type FileProps = {
  // 부모 컴포넌트에 import 해온 타입을 재사용
  content: string;
};
const File = ({ content }: FileProps) => {
  return (
    <div className="card mb-2 mt-2 rounded code">
      <div className="card-body">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default File;
