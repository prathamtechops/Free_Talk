const Page = async () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default Page;
