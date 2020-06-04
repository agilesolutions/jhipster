package ch.agilesolutions.jhipster.meeting.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * MEETING
 */
@ApiModel(description = "MEETING")
@Document(collection = "meeting_room")
public class MeetingRoom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("code")
    private String code;

    @NotNull
    @Field("location")
    private String location;

    @NotNull
    @Field("name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public MeetingRoom code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLocation() {
        return location;
    }

    public MeetingRoom location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public MeetingRoom name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeetingRoom)) {
            return false;
        }
        return id != null && id.equals(((MeetingRoom) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeetingRoom{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", location='" + getLocation() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
