package ch.agilesolutions.jhipster.meeting.web.rest;

import ch.agilesolutions.jhipster.meeting.MeetingApp;
import ch.agilesolutions.jhipster.meeting.domain.MeetingRoom;
import ch.agilesolutions.jhipster.meeting.repository.MeetingRoomRepository;
import ch.agilesolutions.jhipster.meeting.service.MeetingRoomService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MeetingRoomResource} REST controller.
 */
@SpringBootTest(classes = MeetingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeetingRoomResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;

    @Autowired
    private MeetingRoomService meetingRoomService;

    @Autowired
    private MockMvc restMeetingRoomMockMvc;

    private MeetingRoom meetingRoom;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeetingRoom createEntity() {
        MeetingRoom meetingRoom = new MeetingRoom()
            .code(DEFAULT_CODE)
            .location(DEFAULT_LOCATION)
            .name(DEFAULT_NAME);
        return meetingRoom;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeetingRoom createUpdatedEntity() {
        MeetingRoom meetingRoom = new MeetingRoom()
            .code(UPDATED_CODE)
            .location(UPDATED_LOCATION)
            .name(UPDATED_NAME);
        return meetingRoom;
    }

    @BeforeEach
    public void initTest() {
        meetingRoomRepository.deleteAll();
        meetingRoom = createEntity();
    }

    @Test
    public void createMeetingRoom() throws Exception {
        int databaseSizeBeforeCreate = meetingRoomRepository.findAll().size();
        // Create the MeetingRoom
        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isCreated());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeCreate + 1);
        MeetingRoom testMeetingRoom = meetingRoomList.get(meetingRoomList.size() - 1);
        assertThat(testMeetingRoom.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMeetingRoom.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testMeetingRoom.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createMeetingRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meetingRoomRepository.findAll().size();

        // Create the MeetingRoom with an existing ID
        meetingRoom.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setCode(null);

        // Create the MeetingRoom, which fails.


        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setLocation(null);

        // Create the MeetingRoom, which fails.


        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setName(null);

        // Create the MeetingRoom, which fails.


        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMeetingRooms() throws Exception {
        // Initialize the database
        meetingRoomRepository.save(meetingRoom);

        // Get all the meetingRoomList
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meetingRoom.getId())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    public void getMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomRepository.save(meetingRoom);

        // Get the meetingRoom
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms/{id}", meetingRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(meetingRoom.getId()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    public void getNonExistingMeetingRoom() throws Exception {
        // Get the meetingRoom
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomService.save(meetingRoom);

        int databaseSizeBeforeUpdate = meetingRoomRepository.findAll().size();

        // Update the meetingRoom
        MeetingRoom updatedMeetingRoom = meetingRoomRepository.findById(meetingRoom.getId()).get();
        updatedMeetingRoom
            .code(UPDATED_CODE)
            .location(UPDATED_LOCATION)
            .name(UPDATED_NAME);

        restMeetingRoomMockMvc.perform(put("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeetingRoom)))
            .andExpect(status().isOk());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeUpdate);
        MeetingRoom testMeetingRoom = meetingRoomList.get(meetingRoomList.size() - 1);
        assertThat(testMeetingRoom.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMeetingRoom.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testMeetingRoom.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingMeetingRoom() throws Exception {
        int databaseSizeBeforeUpdate = meetingRoomRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeetingRoomMockMvc.perform(put("/api/meeting-rooms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomService.save(meetingRoom);

        int databaseSizeBeforeDelete = meetingRoomRepository.findAll().size();

        // Delete the meetingRoom
        restMeetingRoomMockMvc.perform(delete("/api/meeting-rooms/{id}", meetingRoom.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
