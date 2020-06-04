package ch.agilesolutions.jhipster.meeting.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ch.agilesolutions.jhipster.meeting.web.rest.TestUtil;

public class ParticipantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Participant.class);
        Participant participant1 = new Participant();
        participant1.setId("id1");
        Participant participant2 = new Participant();
        participant2.setId(participant1.getId());
        assertThat(participant1).isEqualTo(participant2);
        participant2.setId("id2");
        assertThat(participant1).isNotEqualTo(participant2);
        participant1.setId(null);
        assertThat(participant1).isNotEqualTo(participant2);
    }
}
