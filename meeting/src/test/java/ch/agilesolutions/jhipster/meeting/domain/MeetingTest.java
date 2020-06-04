package ch.agilesolutions.jhipster.meeting.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ch.agilesolutions.jhipster.meeting.web.rest.TestUtil;

public class MeetingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meeting.class);
        Meeting meeting1 = new Meeting();
        meeting1.setId("id1");
        Meeting meeting2 = new Meeting();
        meeting2.setId(meeting1.getId());
        assertThat(meeting1).isEqualTo(meeting2);
        meeting2.setId("id2");
        assertThat(meeting1).isNotEqualTo(meeting2);
        meeting1.setId(null);
        assertThat(meeting1).isNotEqualTo(meeting2);
    }
}
