interface TripDescriptionProps {
  description: string;
}

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker">Sobre a viagem</h2>
      <p className="text-xs leading-5 text-primaryDarker mt-4">{description}</p>
    </div>
  );
}
