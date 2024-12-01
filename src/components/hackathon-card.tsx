type HackathonCardProps = {
  data: {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
  };
};

export default function HackathonCard({ data }: HackathonCardProps) {
  const { name, description, status } = data;
  const startDate = new Date(data.startDate).toLocaleDateString();
  const endDate = new Date(data.endDate).toLocaleDateString();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-white/80">{description}</p>
        <div className="card-actions items-end justify-between">
          <div>
            <p className="text-xs text-gray-200/60">
              {startDate} - {endDate}
            </p>
            <span className="badge badge-accent">{status}</span>
          </div>
          <button className="btn btn-primary">Join Now</button>
        </div>
      </div>
    </div>
  );
}
