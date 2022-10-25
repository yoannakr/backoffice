import React from "react";
import { BOInput, Row, BOSelect } from "../../../../shared/components";
import styles from "./TasksFilter.module.scss";

export const TasksFilter = () => {
  return (
    <div className={styles.FilterContainer}>
      <Row className={styles.Row}>
        <BOInput label="Title" placeholder="Title" />
      </Row>
      <Row className={styles.Row}>
        <BOInput label="Username" placeholder="Username" />
      </Row>
      <Row className={styles.Row}>
        <BOSelect label="Status" placeholder="Status" />
      </Row>
    </div>
  );
};
