import Contribution from "./contribution/contribution";

const ContainerContributions = (data) => {
  return (
    data.length && (
      <div>
        {data.map((cotribution) => (
          <Contribution contribution={cotribution} key={cotribution._id} />
        ))}
      </div>
    )
  );
};

export default ContainerContributions;
