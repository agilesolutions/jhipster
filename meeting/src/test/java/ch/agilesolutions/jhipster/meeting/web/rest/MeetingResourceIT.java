package ch.agilesolutions.jhipster.meeting.web.rest;

import ch.agilesolutions.jhipster.meeting.MeetingApp;
import ch.agilesolutions.jhipster.meeting.domain.Meeting;
import ch.agilesolutions.jhipster.meeting.domain.MeetingRoom;
import ch.agilesolutions.jhipster.meeting.repository.MeetingRepository;
import ch.agilesolutions.jhipster.meeting.service.MeetingService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MeetingResource} REST controller.
 */
@SpringBootTest(classes = MeetingApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeetingResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MeetingRepository meetingRepository;

    @Mock
    private MeetingRepository meetingRepositoryMock;

    @Mock
    private MeetingService meetingServiceMock;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MockMvc restMeetingMockMvc;

    private Meeting meeting;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meeting createEntity() {
        Meeting meeting = new Meeting()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        // Add required entity
        MeetingRoom meetingRoom;
        meetingRoom = MeetingRoomResourceIT.createEntity();
        meetingRoom.setId("fixed-id-for-tests");
        meeting.setMeetingRoom(meetingRoom);
        return meeting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meeting createUpdatedEntity() {
        Meeting meeting = new Meeting()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        // Add required entity
        MeetingRoom meetingRoom;
        meetingRoom = MeetingRoomResourceIT.createUpdatedEntity();
        meetingRoom.setId("fixed-id-for-tests");
        meeting.setMeetingRoom(meetingRoom);
        return meeting;
    }

    @BeforeEach
    public void initTest() {
        meetingRepository.deleteAll();
        meeting = createEntity();
    }

    @Test
    public void createMeeting() throws Exception {
        int databaseSizeBeforeCreate = meetingRepository.findAll().size();
        // Create the Meeting
        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isCreated());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeCreate + 1);
        Meeting testMeeting = meetingList.get(meetingList.size() - 1);
        assertThat(testMeeting.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMeeting.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMeeting.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testMeeting.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createMeetingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meetingRepository.findAll().size();

        // Create the Meeting with an existing ID
        meeting.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setTitle(null);

        // Create the Meeting, which fails.


        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setStartDate(null);

        // Create the Meeting, which fails.


        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setEndDate(null);

        // Create the Meeting, which fails.


        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMeetings() throws Exception {
        // Initialize the database
        meetingRepository.save(meeting);

        // Get all the meetingList
        restMeetingMockMvc.perform(get("/api/meetings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meeting.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMeetingsWithEagerRelationshipsIsEnabled() throws Exception {
        when(meetingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeetingMockMvc.perform(get("/api/meetings?eagerload=true"))
            .andExpect(status().isOk());

        verify(meetingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMeetingsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(meetingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMeetingMockMvc.perform(get("/api/meetings?eagerload=true"))
            .andExpect(status().isOk());

        verify(meetingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getMeeting() throws Exception {
        // Initialize the database
        meetingRepository.save(meeting);

        // Get the meeting
        restMeetingMockMvc.perform(get("/api/meetings/{id}", meeting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(meeting.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }
    @Test
    public void getNonExistingMeeting() throws Exception {
        // Get the meeting
        restMeetingMockMvc.perform(get("/api/meetings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMeeting() throws Exception {
        // Initialize the database
        meetingService.save(meeting);

        int databaseSizeBeforeUpdate = meetingRepository.findAll().size();

        // Update the meeting
        Meeting updatedMeeting = meetingRepository.findById(meeting.getId()).get();
        updatedMeeting
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restMeetingMockMvc.perform(put("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeeting)))
            .andExpect(status().isOk());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeUpdate);
        Meeting testMeeting = meetingList.get(meetingList.size() - 1);
        assertThat(testMeeting.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMeeting.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMeeting.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testMeeting.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingMeeting() throws Exception {
        int databaseSizeBeforeUpdate = meetingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeetingMockMvc.perform(put("/api/meetings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMeeting() throws Exception {
        // Initialize the database
        meetingService.save(meeting);

        int databaseSizeBeforeDelete = meetingRepository.findAll().size();

        // Delete the meeting
        restMeetingMockMvc.perform(delete("/api/meetings/{id}", meeting.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
