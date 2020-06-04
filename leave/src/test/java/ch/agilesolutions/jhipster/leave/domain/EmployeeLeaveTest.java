package ch.agilesolutions.jhipster.leave.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ch.agilesolutions.jhipster.leave.web.rest.TestUtil;

public class EmployeeLeaveTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeLeave.class);
        EmployeeLeave employeeLeave1 = new EmployeeLeave();
        employeeLeave1.setId("id1");
        EmployeeLeave employeeLeave2 = new EmployeeLeave();
        employeeLeave2.setId(employeeLeave1.getId());
        assertThat(employeeLeave1).isEqualTo(employeeLeave2);
        employeeLeave2.setId("id2");
        assertThat(employeeLeave1).isNotEqualTo(employeeLeave2);
        employeeLeave1.setId(null);
        assertThat(employeeLeave1).isNotEqualTo(employeeLeave2);
    }
}
