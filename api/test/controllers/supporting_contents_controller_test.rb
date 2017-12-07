require 'test_helper'

class SupportingContentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @supporting_content = supporting_contents(:one)
  end

  test "should get index" do
    get supporting_contents_url, as: :json
    assert_response :success
  end

  test "should create supporting_content" do
    assert_difference('SupportingContent.count') do
      post supporting_contents_url, params: { supporting_content: { content_type: @supporting_content.content_type, description: @supporting_content.description, image_url: @supporting_content.image_url, message_id: @supporting_content.message_id, publisher: @supporting_content.publisher, source: @supporting_content.source, title: @supporting_content.title } }, as: :json
    end

    assert_response 201
  end

  test "should show supporting_content" do
    get supporting_content_url(@supporting_content), as: :json
    assert_response :success
  end

  test "should update supporting_content" do
    patch supporting_content_url(@supporting_content), params: { supporting_content: { content_type: @supporting_content.content_type, description: @supporting_content.description, image_url: @supporting_content.image_url, message_id: @supporting_content.message_id, publisher: @supporting_content.publisher, source: @supporting_content.source, title: @supporting_content.title } }, as: :json
    assert_response 200
  end

  test "should destroy supporting_content" do
    assert_difference('SupportingContent.count', -1) do
      delete supporting_content_url(@supporting_content), as: :json
    end

    assert_response 204
  end
end
