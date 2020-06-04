package ch.agilesolutions.jhipster.meeting.repository;

import ch.agilesolutions.jhipster.meeting.domain.MeetingRoom;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the MeetingRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeetingRoomRepository extends MongoRepository<MeetingRoom, String> {
}
