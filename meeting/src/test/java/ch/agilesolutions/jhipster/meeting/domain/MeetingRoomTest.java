package ch.agilesolutions.jhipster.meeting.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ch.agilesolutions.jhipster.meeting.web.rest.TestUtil;

public class MeetingRoomTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeetingRoom.class);
        MeetingRoom meetingRoom1 = new MeetingRoom();
        meetingRoom1.setId("id1");
        MeetingRoom meetingRoom2 = new MeetingRoom();
        meetingRoom2.setId(meetingRoom1.getId());
        assertThat(meetingRoom1).isEqualTo(meetingRoom2);
        meetingRoom2.setId("id2");
        assertThat(meetingRoom1).isNotEqualTo(meetingRoom2);
        meetingRoom1.setId(null);
        assertThat(meetingRoom1).isNotEqualTo(meetingRoom2);
    }
}
