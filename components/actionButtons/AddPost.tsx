"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import AddPostForm from "../form/AddPostForm";
import { SingleImageDropzone } from "../shared/share-post";

export function AddPost() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string>();
  const [onProgress, setOnProgress] = useState(0);
  const { userId } = useAuth();

  if (!userId) return null;

  return (
    <div className="   space-y-3">
      <SingleImageDropzone
        width={250}
        height={250}
        className="mx-auto"
        value={file}
        dropzoneOptions={{
          maxFiles: 1,
          maxSize: 10 * 1024 * 1024, // 10MB
        }}
        onChange={async (file) => {
          setFile(file);

          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              options: {
                temporary: true,
              },
              onProgressChange: (progress) => {
                setOnProgress(progress);
              },
            });

            setUrl(res.url);
          }
        }}
      />

      {/* <div className="h-[6px] w-44 overflow-hidden rounded border">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{
            width: `${onProgress}%`,
          }}
        />
      </div> */}

      {onProgress > 0 && onProgress < 100 ? (
        <div className="mx-auto h-[6px] w-full overflow-hidden rounded border">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{
              width: `${onProgress}%`,
            }}
          />
        </div>
      ) : (
        onProgress === 100 &&
        url &&
        file && <AddPostForm url={url} author={userId} />
      )}
    </div>
  );
}
