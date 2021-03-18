import { HorizontalBar } from "react-chartjs-2";

export default function HorizontalBarChart(props) {
  const { numLearnersForCourses } = props;

  const data = {
    labels: numLearnersForCourses.map((course) => course.course_name),

    datasets: [
      {
        label: "Number of Learners",
        data: numLearnersForCourses.map((course) =>
          Number(course.num_learners)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            minRotation: 5,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return <HorizontalBar data={data} options={options} />;
}
