import { Button } from "antd";

type ReviewCardProps = {
  date: string;
  name: string;
  email: string;
  route: string;
  busNumber: string;
  driver: string;
  rating: string;
  comment: string;
};

export default function ViewFeedback({date,name,email,route,busNumber,driver,rating,comment}:ReviewCardProps ) {
  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="flex flex-col justify-center items-center border px-3 sm:px-8 py-6 shadow-md rounded-sm max-w-[500px] ">
        <h1 className="font-Gilroy-SemiBold text-2xl leading-[29.4px]">View</h1>

        <div className="mt-10 flex flex-col gap-4 container">
          <ViewItems title="Date" paragraph="22-04-2024" />
          <ViewItems title="Name" paragraph="Sharon Levi" />
          <ViewItems title="Email Address" paragraph="shlevi@ecobank.com" />
          <ViewItems title="Route" paragraph="Ajah" />
          <ViewItems title="Bus Number" paragraph="KRD 914 YH" />
          <ViewItems title="Driver" paragraph="Tayo Adewale" />
          <ViewItems title="Rating" paragraph="3 stars" />
          <ViewItems
            title="Comment"
            paragraph="Lorem ipsum v nno rv roivvoi   vorv irov oirv oire ivnvirnoirnv voivnrvovniv rovi roiv rov or rvi rvv ro "
          />
        </div>

        <Button className=" w-full h-[55px] sm:w-[200px] sm:h-[50px] bg-ecobankBlue text-white font-Gilroy-SemiBold  mt-10">
          Done
        </Button>
      </div>
    </div>
  );
}

type ViewItemsProps = {
  title: string;
  paragraph: string;
};

function ViewItems({ title, paragraph }: ViewItemsProps) {
  return (
    <div className="flex flex-row  ">
      <h2 className="basis-[40%] font-Gilroy-SemiBold leading-[19.2px]">{title}:</h2>

      <div className="basis-[60%] font-Gilroy-Regular leading-[19.2px] ">{paragraph}</div>
    </div>
  );
}
