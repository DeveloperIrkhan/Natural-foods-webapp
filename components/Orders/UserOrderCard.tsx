interface IUserOrderCard {
  cardTitle: string;
  children: React.ReactNode;
}
const UserOrderCard = ({ cardTitle, children }: IUserOrderCard) => {
  return (
    <div className="flex max-w-4xl mx-auto shadow-lg rounded-md border">
      <div className="relative">
        <div
          className="absolute left-6 -top-8 w-[120px] h-[30px] 
                   md:-left-7 md:top-6 md:w-[30px] md:h-auto 
                   bg-primary-color text-white 
                   rounded-t-md md:rounded-tl-md md:rounded-bl-md 
                   flex items-center justify-center shadow-md"
        >
          <span
            className="text-xs font-semibold tracking-wide 
                     md:[writing-mode:vertical-rl] md:rotate-180 text-center p-2"
          >
            {cardTitle}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 bg-white">{children}</div>
    </div>
  );
};

export default UserOrderCard;
