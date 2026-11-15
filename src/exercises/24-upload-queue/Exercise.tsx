// EDIT THIS FILE. The instructions are in README.md, in this folder.

type Props = {
  files: { id: string; name: string }[];
  // Resolves when the upload succeeds, rejects when it fails.
  upload: (id: string) => Promise<void>;
};

export default function UploadQueue({ files, upload }: Props) {
  // TODO: at most two uploads at a time, a status per file, Retry on failure, "X of Y uploaded"
  return (
    <p>
      Not built yet. {files.length} files, and upload is a {typeof upload}.
    </p>
  );
}
