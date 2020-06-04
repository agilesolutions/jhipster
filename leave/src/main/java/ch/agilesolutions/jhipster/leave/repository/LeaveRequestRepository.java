package ch.agilesolutions.jhipster.leave.repository;

import ch.agilesolutions.jhipster.leave.domain.LeaveRequest;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LeaveRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {
}
