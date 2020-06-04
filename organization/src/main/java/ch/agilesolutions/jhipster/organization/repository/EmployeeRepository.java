package ch.agilesolutions.jhipster.organization.repository;

import ch.agilesolutions.jhipster.organization.domain.Employee;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
